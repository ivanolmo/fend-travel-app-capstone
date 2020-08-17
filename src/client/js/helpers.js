const getLocation = async (url = '') => {
  const response = await fetch(url);
  try {
    return await response.json();
  } catch (error) {
    console.log(`getLocation error is ${error}`)
  }
};

const getWeather = async (url = '') => {
  const response = await fetch(url);
  try {
    return await response.json();
  } catch (error) {
    console.log(`getWeather error is ${error}`)
  }
};

const getImage = async (url = '') => {
  const response = await fetch(url);
  try {
    return await response.json();
  } catch (error) {
    console.log(`getImage error is ${error}`)
  }
};

export { getLocation, getWeather, getImage };