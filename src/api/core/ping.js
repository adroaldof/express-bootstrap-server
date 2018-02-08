export default function ping (req, res) {
  const pong = {
    answer: 'Pong',
    ok: true,
    now: new Date(),
  };

  return res.send(pong);
}
