import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button'
import { useDrugs } from "../hooks/useDrugs";
import { useSearch } from "../hooks/useSearch";
import { useEffect } from 'react';
import { Typography } from '@mui/material';




export const DrugDetail = () => {
  const { drugId } = useParams();
  const navigate = useNavigate();
  const { drugs, getDrugs, loading, error } = useDrugs();
  const { setSearchData } = useSearch();

  useEffect(() => {
    // Establece el id en searchData y ejecuta la búsqueda
    setSearchData((prev) => ({ ...prev, id: drugId }));
    getDrugs({ id: drugId });
  }, [drugId, setSearchData, getDrugs]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Drug Details</h1>
      <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
      {drugs.results.map((drug) => (
                <Typography key={drug.set_id} gutterBottom variant="h5" component="div">
                {drug.openfda.brand_name}
              </Typography>

      ))}

    </div>
  );
};
