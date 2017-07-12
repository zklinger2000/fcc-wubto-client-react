export function handleFetchErrors(response) {
  if (response.status != 200) {
    throw response;
  }
  return response;
}
