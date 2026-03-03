import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          background: '#1C3A2E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}
      >
        {/* Lotus petals using layered divs */}
        {/* Center petal */}
        <div style={{
          position: 'absolute',
          width: 10,
          height: 26,
          background: '#C9A96E',
          borderRadius: '50%',
          top: 10,
          left: 27,
        }} />
        {/* Left inner petal */}
        <div style={{
          position: 'absolute',
          width: 9,
          height: 22,
          background: '#C9A96E',
          borderRadius: '50%',
          top: 14,
          left: 16,
          transform: 'rotate(-28deg)',
        }} />
        {/* Right inner petal */}
        <div style={{
          position: 'absolute',
          width: 9,
          height: 22,
          background: '#C9A96E',
          borderRadius: '50%',
          top: 14,
          left: 39,
          transform: 'rotate(28deg)',
        }} />
        {/* Left outer petal */}
        <div style={{
          position: 'absolute',
          width: 7,
          height: 17,
          background: '#C9A96E',
          borderRadius: '50%',
          top: 18,
          left: 7,
          transform: 'rotate(-50deg)',
        }} />
        {/* Right outer petal */}
        <div style={{
          position: 'absolute',
          width: 7,
          height: 17,
          background: '#C9A96E',
          borderRadius: '50%',
          top: 18,
          left: 50,
          transform: 'rotate(50deg)',
        }} />
        {/* Stem */}
        <div style={{
          position: 'absolute',
          width: 4,
          height: 8,
          background: '#C9A96E',
          borderRadius: 2,
          bottom: 12,
          left: 30,
        }} />
        {/* Water line */}
        <div style={{
          position: 'absolute',
          width: 38,
          height: 2,
          background: '#C9A96E',
          borderRadius: 2,
          bottom: 10,
          left: 13,
          opacity: 0.7,
        }} />
      </div>
    ),
    { ...size }
  )
}
