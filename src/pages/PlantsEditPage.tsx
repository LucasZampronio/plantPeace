import PlantForm from "../components/PlantsForm";

export default function PlantsEditPage() {
  return (
    <PlantForm
      mode="edit"
      // initialData={plantData}
      onSubmit={async (data) => {
        console.log(data);
      }}
    />
  );
}
