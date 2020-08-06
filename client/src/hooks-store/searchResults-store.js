import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    SAVE_BOOK: (currentState, productId) => {
      const prodIndex = currentState.products.findIndex(
        (p) => p.id === productId
      );
      const newFavStatus = !currentState.products[prodIndex].isFavorite;
      const updatedProducts = [...currentState.products];
      updatedProducts[prodIndex] = {
        ...currentState.products[prodIndex],
        isFavorite: newFavStatus,
      };
      return { products: updatedProducts };
    },
  };
  initStore(actions, {});
};

export default configureStore;