import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button'

const drugs = [
  { id: 1, name: 'Drugs 1', description: 'Description of Drugs 1' },
  { id: 2, name: 'Drugs 2', description: 'Description of Drugs 2' },
  { id: 3, name: 'Drugs 3', description: 'Description of Drugs 3' },
];

export const DrugDetail = () => {
  const { drugId } = useParams();
  const navigate = useNavigate();
  const drug = drugs.find(d => d.id === parseInt(drugId));

  if (!drug) {
    return <h2>Drugs not found</h2>;
  }

  return (
    <div>
      <h1>Drug Details</h1>
      <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <h3>{drug.name}</h3>
      <p>{drug.description}</p>
    </div>
  );
};
