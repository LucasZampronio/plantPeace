import { PlantFormData, usePlantForm } from "../hooks/usePlantForm";
import loginBackground from "../images/defautplant.png";
import nature from "../images/nature.png";
import { InputField } from "./InputField";
import Button from "./Button";
import CheckboxField from "./CheckboxField";


interface PlantFormProps {
  mode: "register" | "edit";
  initialData?: Partial<PlantFormData>;
  onSubmit: (data: PlantFormData) => Promise<void>;
}

const PlantForm = ({
  mode = "register",
  initialData,
  onSubmit,
}: PlantFormProps) => {
  const { formData, errors, isSubmitting, handleSubmit, handleCheckboxChange, handleChange } =
    usePlantForm({
      initialData,
      onSubmit,
    });

  const formConfig = {
    title: mode === "edit" ? "Edit Plant" : "Register Plant",
    buttonText: mode === "edit" ? "Save To Edit plant →" : "Register Plant →",
    description:
      mode === "edit"
        ? "Update the plant details below."
        : "Fill out the form below to register your plant in our database.",
  };

  //criando um objeto com os campos do formulário pra facilitar a manipulação
  const inputFields = [
    {
      label: "Plant Name",
      placeholder: "Echinocereus Cactus",
      error: errors.name,
      errorId: "name-error",
      type: "text",
      id: "name",
      name: "name",
      autoComplete: "name",
      value: formData.name,
      onChange: handleChange,
    },
    {
      label: "Plant Subtitle",
      placeholder: "A majestic addition to your plant collection",
      error: errors.subtitle,
      errorId: "subtitle-error",
      type: "text",
      id: "subtitle",
      name: "subtitle",
      autoComplete: "subtitle",
      value: formData.subtitle,
      onChange: handleChange,
    },
    {
      label: "Category",
      placeholder: "Cactus",
      error: errors.category,
      errorId: "category-error",
      type: "text",
      id: "category",
      name: "category",
      autoComplete: "category",
      value: formData.category,
      onChange: handleChange,
    },
    {
      label: "Price",
      placeholder: "$139.99",
      error: errors.price,
      errorId: "price-error",
      type: "text",
      id: "price",
      name: "price",
      autoComplete: "price",
      value: formData.price,
      onChange: handleChange,
    },
    {
      label: "Discount Percentage",
      placeholder: "10%",
      error: errors.discountPorcentage,
      errorId: "discountPorcentage-error",
      type: "text",
      id: "discountPorcentage",
      name: "discountPorcentage",
      autoComplete: "discountPorcentage",
      value: formData.discountPorcentage,
      onChange: handleChange,
    },
    {
      label: "Description",
      placeholder: "Ladyfinger cactus...",
      error: errors.description,
      errorId: "description-error",
      type: "text",
      id: "description",
      name: "description",
      autoComplete: "description",
      value: formData.description,
      onChange: handleChange,
    },
    {
      label: "Image URL",
      placeholder: "https://via.placeholder.com/600/810b14",
      error: errors.imageUrl,
      errorId: "imageUrl-error",
      type: "text",
      id: "imageUrl",
      name: "imageUrl",
      autoComplete: "imageUrl",
      value: formData.imageUrl,
      onChange: handleChange,
    },
  ];

  return (
    <div className="main-content flex w-full relative h-auto">
      {/* Div esquerda (Formulário) */}
      <img
        src={nature}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-0"
      />
      <div className="flex flex-1 flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-2 rounded-2xl bg-white"
        >
          {/* cabeçalho */}
          <div className="flex flex-col items-start gap-1 sm:pr-0 pl-10 w-full max-w-lg">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-800 to-emerald-700 bg-clip-text text-transparent">
              {formConfig.title}
            </h2>
            <p className="text-left text-gray-500 w-[400px] text-sm ">
              {formConfig.description}
              {/* Fill out the form below to register your plant in our database. */}
            </p>
            <div className=" w-44 h-1 bg-gradient-to-r from-emerald-500 to-black rounded-full opacity-80" />
          </div>
          {/* campos do form */}
          <div className="flex flex-col sm:pl-10 sm:pr-10 w-full max-w-lg h-full">
            {" "}
            {/* percorrendo os inputs */}
            {inputFields.slice(0, 3).map((field) => (
              <div className="relative w-full mt-2" key={field.id}>
                <InputField {...field} />
              </div>
            ))}
            {/* colocando os campos input Preço e Desconto lado a lado, acessando o indice */}
            <div className="flex gap-4 w-full mt-4">
              <div className="relative w-1/2">
                <InputField {...inputFields[3]} className="w-full" />
              </div>
              <div className="relative w-1/2">
                <InputField {...inputFields[4]} className="w-full" />
              </div>
            </div>
            {/* outros campos */}
            {inputFields.slice(5).map((field) => (
              <div className="relative w-full mt-4" key={field.id}>
                <InputField {...field} />
              </div>
            ))}
            {/* checkbox */}
            <div className="relative w-full mt-4 mb-2">
              <CheckboxField
                id="highlightItem"
                label="Highlight this item"
                onChange={(checked) => handleCheckboxChange(checked)}
              />
            </div>
          </div>
          {/* erros gerais */}
          {errors.general && (
            <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{errors.general}</span>
            </div>
          )}
          {/* botao de submit do registro */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-110 flex justify-center bg-gradient-to-r from-emerald-700 to-emerald-800 text-white p-1 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-transform duration-200 disabled:opacity-75 disabled:cursor-not-allowed z-1"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Carregando...
              </span>
            ) : (
              formConfig.buttonText
            )}
          </Button>
        </form>
      </div>

      {/* div direita (imagem) */}
      <img
        src={loginBackground}
        alt=""
        className="flex-1 hidden md:flex object-cover w-full h-full max-h-[800px] object-[center_80%] z-1"
      />
      {/* <div className="flex-1 hidden md:flex h-full">
        <img
          src={loginBackground}
          alt=""
          className="object-cover w-full h-screen object-[center_100%] z-1"
        />
      </div> */}
    </div>
  );
};

export default PlantForm;
