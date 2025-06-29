const IconPencil = ({ stroke = '#9DA4B2' }: { fill?: string; stroke?: string }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.51334 14.1667H14.1667M1.83334 11.6213V14.1667H4.37873C4.55473 14.1667 4.72351 14.0968 4.84796 13.9723L13.9723 4.84795C14.2315 4.5888 14.2315 4.16864 13.9723 3.90949L12.0905 2.02769C11.8314 1.76855 11.4112 1.76855 11.1521 2.02769L2.0277 11.1521C1.90326 11.2765 1.83334 11.4453 1.83334 11.6213Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconPencil;
