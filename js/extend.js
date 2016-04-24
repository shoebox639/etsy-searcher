export default function(base, target) {
  const result = JSON.parse(JSON.stringify(base));
  Object.keys(target).forEach((key) => {
    result[key] = target[key];
  });
  
  return result;
}