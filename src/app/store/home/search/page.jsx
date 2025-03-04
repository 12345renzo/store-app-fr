import { Container, Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";
import pro from "../../../../styles/producto.module.css";
import SearchBar from "@/components/SearchBar";

async function page({ searchParams }) {
  const searchQuery = searchParams?.q || "";
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: "95px", mb: "50px" }}>
        <Grid2 container size={12} sx={{ color: "white" }}>
          <Grid2 size={12} mb={1} mt={2} display="flex" justifyContent="center">
            <Typography variant="h4" className={pro.resu}>
              Buscador
            </Typography>
          </Grid2>
          <SearchBar initialQuery={searchQuery} />
        </Grid2>
      </Container>
      {/*searchQuery && <CardComponents searchQuery={searchQuery} />*/}
    </>
  );
}

page.propTypes = {
  searchParams: PropTypes.shape({
    q: PropTypes.string,
  }),
};

export default page;
