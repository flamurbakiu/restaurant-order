import { useState, useEffect, useCallback } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';
import './loading.css';

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      'https://react-http-b3bb5-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    const loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }

    setMeals(loadedMeals);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [fetchMealsHandler]);

  let content = <p>Found no movies!</p>;

  if (meals.length > 0) {
    const mealsList = meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
    content = <ul>{mealsList}</ul>;
  }

  if (isLoading) {
    content = (
      <section className='lds-container'>
        <div class='lds-ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    );
  }

  if (error) {
    content = <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
}

export default AvailableMeals;
