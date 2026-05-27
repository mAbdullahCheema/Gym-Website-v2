import { useState } from 'react'

export default function SplineScene() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/[0.03] via-background to-background" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary-fixed/5 blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-primary-fixed/3 blur-3xl" />
        </div>
      )}
      <iframe
        src="https://my.spline.design/tigwiglass-95IUGQR85d9b4YQFC4pvitkz-ExW/"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
        onLoad={() => setLoaded(true)}
        title="3D Background"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/20 to-background/60 z-[1]" />
    </div>
  )
}
