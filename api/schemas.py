from pydantic import BaseModel, Field
from typing import List, Optional

class TrainConfig(BaseModel):
    target_column: str = "target"
    hidden_layers: List[int] = Field(default_factory=lambda: [32, 16])
    polynomial_degree: int = Field(default=2, ge=1, le=3)
    max_multiplicative_depth: int = Field(default=2, ge=1, le=8)
    epochs: int = Field(default=250, ge=20, le=3000)
    learning_rate: float = Field(default=0.01, gt=0, le=1)
    distillation_alpha: float = Field(default=0.35, ge=0, le=1)
    temperature: float = Field(default=2.0, ge=0.5, le=10)
    accuracy_target: float = Field(default=0.95, ge=0.5, le=1)

class PredictRequest(BaseModel):
    model_id: str
    features: List[float]

class TrainResponse(BaseModel):
    model_id: str
    metrics: dict
    config: dict
    architecture: dict
    message: str
