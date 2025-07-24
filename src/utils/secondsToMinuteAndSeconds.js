

function secondsToMinutesAndSeconds(seconds) {
  // Ensure seconds is a positive number
  seconds = Math.abs(Number(seconds)) || 0;

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format the result with leading zeros
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export default secondsToMinutesAndSeconds;