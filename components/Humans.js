import Human from "../components/Human";

export const Humans = ({
  humans,
  teamId,
  onHumanEditSubmit,
  onShowPostSubmitModal,
  onPostRemove,
  searchString,
}) => {
  return (
    <div className="humans">
      {humans.map((human) => (
        <Human
          key={human.id}
          human={human}
          teamId={teamId}
          onHumanEditSubmit={onHumanEditSubmit}
          onShowPostSubmitModal={onShowPostSubmitModal}
          onPostRemove={onPostRemove}
          searchString={
            searchString && searchString.length >= 2 && searchString
          }
        />
      ))}
    </div>
  );
};

export default Humans;
