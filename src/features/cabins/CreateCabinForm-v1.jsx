import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();

  const { errors } = formState;

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => toast.success(error.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError() {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least one" },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least one" },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= +getValues().regularPrice ||
              "Discount should be less than or equal the regular price",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        error={errors?.description?.message}
        label="Description for website"
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.image?.message} label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
