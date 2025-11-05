function LoadingPage() {

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <img 
        src="https://cdn.dribbble.com/userupload/20788761/file/original-ed6bc0c7d123dadaf1d5b5dc574a5017.gif" 
        alt="Loading" 
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default LoadingPage