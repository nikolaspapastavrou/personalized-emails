export default function handler(req, res) {
  if (req.method === 'GET') {
    return 'hi';
  } else {
    return 'hello';
  }
}
