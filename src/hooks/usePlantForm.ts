import {useState} from "react";

export interface PlantFormData {
  name: string;
  subtitle: string;
  category: string;
  price: string;
  discountPorcentage?: string;
  description: string;
  imageUrl: string;
  highlightItem: boolean;
}

interface UsePlantFormProps {
  initialData?: Partial<PlantFormData>;
  onSubmit: (data: PlantFormData) => Promise<void>;
}

const ERROR_MESSAGES = {
  NAME_REQUIRED: "Nome é obrigatório",
  SUBTITLE_REQUIRED: "Subtítulo é obrigatório",
  CATEGORY_REQUIRED: "Categoria é obrigatória",
  PRICE_REQUIRED: "Preço é obrigatório",
  PRICE_INVALID: "Preço deve ser um número válido",
  DISCOUNT_INVALID: "Porcentagem de desconto inválida",
  DESCRIPTION_REQUIRED: "Descrição é obrigatória",
  IMAGEURL_REQUIRED: "Imagem é obrigatória",
  GENERAL_ERROR: "Erro no processamento",
};

export function usePlantForm({ initialData, onSubmit }: UsePlantFormProps) {
  const [formData, setFormData] = useState<PlantFormData>({
    name: initialData?.name || "",
    subtitle: initialData?.subtitle || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    discountPorcentage: initialData?.discountPorcentage || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
    highlightItem: initialData?.highlightItem || false,
  });

  const [errors, setErrors] = useState<{
    [key in keyof PlantFormData]?: string;
  } & { general?: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const sanitizeInput = (value: string) => {
  return value.replace(/<[^>]*>?/gm, ""); 
};

  const validateField = (name: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);

    switch (name) {
      case "name":
        return !sanitizedValue ? ERROR_MESSAGES.NAME_REQUIRED : "";
      case "subtitle":
        return !sanitizedValue ? ERROR_MESSAGES.SUBTITLE_REQUIRED : "";
      case "category":
        return !sanitizedValue ? ERROR_MESSAGES.CATEGORY_REQUIRED : "";
      case "price":
        if (!sanitizedValue) return ERROR_MESSAGES.PRICE_REQUIRED;
        if (isNaN(Number(sanitizedValue))) return ERROR_MESSAGES.PRICE_INVALID;
        return "";
      case "discountPorcentage":
        if (sanitizedValue && isNaN(Number(sanitizedValue))) {
          return ERROR_MESSAGES.DISCOUNT_INVALID;
        }
        return "";
      case "description":
        return !sanitizedValue ? ERROR_MESSAGES.DESCRIPTION_REQUIRED : "";
      case "imageUrl":
        return !sanitizedValue ? ERROR_MESSAGES.IMAGEURL_REQUIRED : "";
      default:
        return "";
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, highlightItem: checked }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, sanitizedValue),
      general: "",
    }));
  };

  const validateForm = () => {
    const validationErrors = {
      name: validateField("name", formData.name),
      subtitle: validateField("subtitle", formData.subtitle),
      category: validateField("category", formData.category),
      price: validateField("price", formData.price),
      discountPorcentage: validateField("discountPorcentage", formData.discountPorcentage || ""),
      description: validateField("description", formData.description),
      imageUrl: validateField("imageUrl", formData.imageUrl),
    };

    const hasErrors = Object.values(validationErrors).some(error => error);
    setErrors(validationErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    try { 
      await onSubmit(formData);

      // Resetar os campos após envio bem-sucedido
      setFormData({
        name: "",
        subtitle: "",
        category: "",
        price: "",
        discountPorcentage: "",
        description: "",
        imageUrl: "",
        highlightItem: false,
      });

      // Exibir mensagem de sucesso
      setSuccessMessage("Formulário enviado com sucesso!");

      // Remover mensagem após 3 segundos
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : ERROR_MESSAGES.GENERAL_ERROR,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleCheckboxChange,
    setFormData,
    successMessage
  };
}