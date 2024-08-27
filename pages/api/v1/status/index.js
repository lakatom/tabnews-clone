function status(request, response) {
  response.status(200).json({ chave: "parabéns, deu certo!!!" });
}
export default status;
