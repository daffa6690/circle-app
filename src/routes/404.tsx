import Logo from '@/assets/404.svg';

export function NotFound() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={Logo} />
      <h1
        style={{
          fontSize: '30px',
          fontWeight: 'bold',
          margin: '10px',
        }}
      >
        Page Not Found!
      </h1>
    </div>
  );
}
