import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
    const [expandedGames, setExpandedGames] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleGameRules = (gameId) => {
    setExpandedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-white py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 mb-3">
                The Animal Trait Guesser Rulebook Arbitrator
              </h1>
              <p className="lead mb-4">
                Clarifying specific rules
              </p>
              <Form onSubmit={handleSearch}>
                <InputGroup size="lg">
                  <Form.Control
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="light" type="submit">
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h3 className="mb-3">Animal Trait Guesser</h3>
            <p className="text-muted">
              List your physical traits and the bot guesses will guess which animals' traits you have and see how accurate it is!
            </p>
          </Col>
        </Row>

        <Row>
          {popularGames.map((game) => (
            <Col key={game.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Badge bg="secondary" className="mb-3">
                    {game.category}
                  </Badge>
                  
                  {expandedGames.includes(game.id) ? (
                    <div className="rules-list mb-3">
                      <h6 className="mb-2">Game Rules:</h6>
                      <ul className="small">
                        {game.rules.map((rule, index) => (
                          <li key={index} className="mb-1">{rule}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Card.Text>
                      List your physical traits and the bot guess which animals' traits you have and see how accurate it is!
                      {game.name}.
                    </Card.Text>
                  )}
                  
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => toggleGameRules(game.id)}
                  >
                    {expandedGames.includes(game.id) ? 'Hide Rules' : 'View Rules'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Features Section */}
        <Row className="mt-5">
          <Col lg={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3 feature-icon">
                  <h3>Comprehensive Rules</h3>
                </div>
                <Card.Title>Comprehensive Rules</Card.Title>
                <Card.Text>
                  Access rules for Animal Trait Guesser
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3 feature-icon">
                  <h3>Conditions</h3>
                </div>
                <Card.Title>Conditions</Card.Title>
                <Card.Text>
                  Simply input your physical traits and our bot will do everything for you!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3 feature-icon">
                  <h3>Rule Arbitration</h3>
                </div>
                <Card.Title>Rule Arbitration</Card.Title>
                <Card.Text>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeScreen;
