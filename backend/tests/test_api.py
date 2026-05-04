import pytest
from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch, AsyncMock

client = TestClient(app)

@pytest.fixture
def mock_kobo_service():
    with patch("app.api.endpoints.assets.kobo_service", new_callable=AsyncMock) as mock:
        yield mock

def test_health_check():
    # Simple check if app loads
    assert app.title == "KoboToolbox API Proxy"

@patch("app.api.endpoints.assets.kobo_service.get_assets", new_callable=AsyncMock)
def test_get_assets_endpoint(mock_get):
    mock_get.return_value = [{"uid": "a1", "name": "Survey 1"}]
    response = client.get("/api/assets")
    assert response.status_code == 200
    assert response.json() == [{"uid": "a1", "name": "Survey 1"}]

@patch("app.api.endpoints.assets.kobo_service.get_asset_data", new_callable=AsyncMock)
def test_get_data_normalization_flow(mock_get_data):
    # Mock raw kobo data
    mock_get_data.return_value = {
        "count": 1,
        "fetched": 1,
        "results": [
            {
                "_id": 1,
                "S0/cedula_encuestador": "12345",
                "start": "2026-02-09T11:00:00Z",
                "end": "2026-02-09T11:30:00Z",
                "ubicacion_final/nota": "totalmente"
            }
        ]
    }
    
    response = client.get("/api/data/asset123")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 1
    assert len(data["results"]) == 1
    assert "_backend_meta" in data["results"][0]
    assert data["results"][0]["_backend_meta"]["cedula_encuestador"] == "12345"
    # Verify Gzip middleware works (optional, but good)
    # The client handles decompression automatically, but we can check headers if needed
