import { Link } from 'react-router-dom';

const drugs = [
  { id: 1, name: 'Drug 1', description: 'Description of Drug 1' },
  { id: 2, name: 'Drug 2', description: 'Description of Drug 2' },
  { id: 3, name: 'Drug 3', description: 'Description of Drug 3' },
];

export const DrugList = () => (
  <div>
    <h1>Drugs</h1>
    <ul>
      {drugs.map(drug => (
        <li key={drug.id}>
          <Link to={`/drug/${drug.id}`}>{drug.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);
