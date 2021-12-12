import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { useState, useContext } from 'react';
import AppContext from './context';
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

function Dishes(props) {
  console.log('dish propos', props);
  const [restaurantID, setRestaurantID] = useState();
  const { addItem } = useContext(AppContext);

  const GET_RESTAURANT_DISHES = gql`
    query ($id: ID!) {
      restaurant(id: $id) {
        id
        name
        dishes {
          id
          name
          description
          price
          image {
            url
          }
        }
      }
    }
  `;

  const router = useRouter();
  console.log('router', router.query.dishes);

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.dishes },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;

  const searchQuery =
    data.restaurant.dishes.filter(res => {
      return res.name.toLowerCase().includes(props.search);
    }) || [];

  let restId = searchQuery[0] ? searchQuery[0].id : null;

  if (restId > 0) {
    return (
      <>
        <Row>
          {searchQuery.map(res => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: '0 10px' }}>
                <CardImg
                  top={true}
                  style={{ height: 150, width: 150 }}
                  src={`http://localhost:1337${res.image.url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                  <CardText>${res.price}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button
                    color="info"
                    outline
                    color="primary"
                    onClick={() => addItem(res)}
                  >
                    + Add To Cart
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  } else {
    return <h1> No Dishes Found</h1>;
  }
}
export default Dishes;
