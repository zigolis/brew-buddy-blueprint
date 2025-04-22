
import HopRow from "./HopRow";

const HopsRowsList = ({ hops, form, removeHop }) => {
  return (
    <>
      {hops.map((hop, index) => (
        <HopRow
          key={hop.id}
          hop={hop}
          index={index}
          form={form}
          control={form.control}
          onRemove={removeHop}
        />
      ))}
    </>
  );
};

export default HopsRowsList;
