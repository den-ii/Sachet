export default function onlyDigits(e) {
  const value = e.target.value;
  const sanitizedValue = value.replace(/\D/g, ""); // Remove non-digit characters
  e.target.value = sanitizedValue;
}
