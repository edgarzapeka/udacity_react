const API_ID = '50e2b67c'//process.env.REACT_APP_API_ID
const APP_KEY = 'ce54591d06357df1608e0e1396cb302c' //process.env.REACT

export function fetchRecipes (food = '') {
  food = food.trim()

  return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe))
}