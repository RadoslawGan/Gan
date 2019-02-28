"""Unit tests for the HQ source."""

import unittest
from unittest.mock import Mock, patch

from collector.collector import Collector


class HQTest(unittest.TestCase):
    """Unit tests for the HQ metrics."""

    def setUp(self):
        """Test fixture."""
        Collector.RESPONSE_CACHE.clear()

    def test_violations(self):
        """Test the number of violations."""
        mock_response = Mock()
        mock_response.json = Mock(return_value=dict(metrics=[dict(stable_metric_id="id", value="10")]))
        sources = dict(a=dict(type="hq", parameters=dict(url="metrics.json", metric_id="id")))
        with patch("requests.get", return_value=mock_response):
            response = Collector().get("violations", sources)
        self.assertEqual("10", response["sources"][0]["value"])
