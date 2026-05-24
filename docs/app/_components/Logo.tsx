type LogoProps = {
  size?: number
}

const VIEWBOX_W = 41.336
const VIEWBOX_H = 28.888

export function Logo({ size = 28 }: LogoProps) {
  const width = (size * VIEWBOX_W) / VIEWBOX_H
  return (
    <svg
      width={width}
      height={size}
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CodeTube"
      role="img"
    >
      <path
        d="M 40.419 4.517 c -0.482,-1.781 -1.871,-3.175 -3.651,-3.651 -2.392,-0.923 -25.559,-1.376 -32.279,0.026 -1.781,0.482 -3.175,1.871 -3.651,3.651 -1.080,4.736 -1.162,14.975 0.026,19.817 0.482,1.781 1.871,3.175 3.651,3.651 4.736,1.090 27.252,1.244 32.279,0 1.781,-0.482 3.175,-1.871 3.651,-3.651 1.151,-5.159 1.233,-14.764 -0.026,-19.844 z"
        fill="#ff0000"
      />
      <text
        x="7.141"
        y="20.509"
        fill="#ffffff"
        fontSize="16.933"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight={900}
      >
        {'</>'}
      </text>
    </svg>
  )
}

export function Wordmark() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 700,
        fontSize: '1.05rem',
        letterSpacing: '-0.01em'
      }}
    >
      <Logo size={22} />
      CodeTube
    </span>
  )
}
