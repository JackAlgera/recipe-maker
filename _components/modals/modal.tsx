import { useForm } from 'react-hook-form';

export const Modal = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <div>
      <button id="openModal">Open the modal</button>
      {/*<dialog>*/}
      {/*  <form onSubmit={onSubmit}>*/}
      {/*    <label>Ingredient name</label>*/}
      {/*    <input {...register('name', { required: true })} />*/}
      {/*    {errors.name && <span>This field is required</span>}*/}
      {/*    <input type="submit" />*/}
      {/*  </form>*/}
      {/*</dialog>*/}
    </div>
  );
}
