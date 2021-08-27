import RecipeCard from "../UI/RecipeCard";

const Recipe = (props) => {
  const recipeEditHanlder = () => {};
  const recipeRemoveHandler = () => {};
  return (
    <RecipeCard
      header={props.name}
      type={props.type}
      servings={props.servings}
      onEdit={recipeEditHanlder}
      onRemove={recipeRemoveHandler}
    />
  );
};

export default Recipe;
