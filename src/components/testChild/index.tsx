export const TestChild = (props: any) => {
  return (
    <>
      <span id="woah" className="this is a class" data-testid="here">
        hi
      </span>
      <span data-testid="here" className="this is a" id="woah">
        hi
      </span>
    </>
  );
};
