function Loading() {
  return (
    <div className="absolute inset-0 h-screen w-screen flex items-center justify-center bg-primary">
      <div className="h-12 w-12 rounded-full border-4 border-secondary border-dashed animate-spin"></div>
    </div>
  )
}

export default Loading;
