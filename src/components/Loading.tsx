const Loading = () => {
  return (
    <div className="fixed inset-0 bg-emerald-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        <span className="text-white text-xl font-semibold">Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
