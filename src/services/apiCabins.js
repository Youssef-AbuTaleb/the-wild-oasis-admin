import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  const hasImagePath = newCabin.image?.startsstartsWith?.(supabaseUrl);

  // 1- preparing image data
  //   1.a- creating random image name
  //      - remove all "/" as this will create folders in supabase image storage.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  console.log(hasImagePath);
  console.log(imageName);

  //   1.b- this path extracted from image uploaded manually to supabase
  //      - create an image path similar to the extracted path.
  // https://uxiichzxundyllfsftuw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-03-31T04%3A41%3A05.452Z
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // 2- create/edit cabin and save all data in database
  // A) Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) Edit
  if (id) {
    console.log(newCabin);
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 3- upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 4- Delete the cabin if there was an error in image storage
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return true;
}
