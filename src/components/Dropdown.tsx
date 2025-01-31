import { FC, ReactNode, useState } from 'react';

interface DropdownProps {
  title: string;
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
      >
        {title}
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
