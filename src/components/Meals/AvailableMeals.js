import React, { useCallback, useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem';
function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log(meals);

  function convertDataToArr(data) {
    const arr = [];
    for (const id in data) {
      arr.push({
        id: data[id].id,
        name: data[id].name,
        description: data[id].description,
        price: data[id].price,
      });
    }
    return arr;
  }
  const getMeals = useCallback(async () => {
    try {
      const response = await fetch(
        'https://react-http-ef528-default-rtdb.firebaseio.com/meals.json'
      );
      if (!response.ok) {
        throw new Error('somthing went wrong');
      }
      const data = await response.json();
      const dataArr = convertDataToArr(data);
      console.log(dataArr);
      setMeals(dataArr);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    getMeals();
  }, [getMeals]);
  const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];
  return (
    <section className={classes.meals}>
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {isLoading && (
        <p style={{ textAlign: 'center', color: 'white' }}>Loading...</p>
      )}
      {!error && !isLoading && (
        <Card>
          <ul>
            {meals.map((meal) => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
          </ul>
        </Card>
      )}
    </section>
  );
}

export default AvailableMeals;
