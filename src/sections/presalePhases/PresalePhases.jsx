import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PresalePhasesWrapper from "./PresalePhases.style";
import hatImage from "../../assets/images/maga_cap.png";
import stagesBackground from "../../assets/images/Stages-background.png";
import { useMediaQuery } from "react-responsive";
import { PresaleContext } from "../../utils/PresaleContext";

const PresalePhases = () => {
  const { currentStage, tokenSold, presaleToken, tokenPercent } = useContext(PresaleContext);
  const INACTIVITY_TIMEOUT = 45000; // 45 seconds in milliseconds
  
  const [activePhase, setActivePhase] = useState(parseInt(currentStage) || 1); // Current active phase (1-9)
  const [progressPercent, setProgressPercent] = useState(tokenPercent || 0); // Progress percentage (0-100)
  const [selectedPhase, setSelectedPhase] = useState(parseInt(currentStage) || 1); // Track which phase info to display
  const [currentMobilePhase, setCurrentMobilePhase] = useState(parseInt(currentStage) || 1); // For mobile slider
  
  // Media query for mobile view
  const isMobile = useMediaQuery({ maxWidth: 991 });
  
  // Ref to store the reset timeout
  const resetTimeoutRef = useRef(null);
  
  // Presale phases data
  const phases = [
    {
      id: 1,
      title: "Stage 1",
      price: "$0.0004",
      volume: "2,000,000",
      bonus: "10%",
      status: "Completed"
    },
    {
      id: 2,
      title: "Stage 2",
      price: "$0.0006",
      volume: "2,000,000",
      bonus: "8%",
      status: "Completed"
    },
    {
      id: 3,
      title: "Stage 3",
      price: "$0.0008",
      volume: "2,000,000",
      bonus: "6%",
      status: "Completed"
    },
    {
      id: 4,
      title: "Stage 4",
      price: "$0.001",
      volume: "2,000,000",
      bonus: "5%",
      status: "Active"
    },
    {
      id: 5,
      title: "Stage 5",
      price: "$0.0012",
      volume: "2,000,000",
      bonus: "4%",
      status: "Upcoming"
    },
    {
      id: 6,
      title: "Stage 6",
      price: "$0.0015",
      volume: "2,000,000",
      bonus: "3%",
      status: "Upcoming"
    },
    {
      id: 7,
      title: "Stage 7",
      price: "$0.002",
      volume: "2,000,000",
      bonus: "2%",
      status: "Upcoming"
    },
    {
      id: 8,
      title: "Stage 8",
      price: "$0.003",
      volume: "2,000,000",
      bonus: "1%",
      status: "Upcoming"
    },
    {
      id: 9,
      title: "Stage 9",
      price: "$0.005",
      volume: "2,000,000",
      bonus: "0%",
      status: "Upcoming"
    }
  ];

  // Calculate progress percentage based on active phase
  const calculateProgress = (phaseId) => {
    // Special case: if phase 9 is selected, show 100% progress
    if (phaseId === 9) {
      return 100;
    }
    
    // For completed phases, we count 100% of their segment
    // For active phase, we count 50% of its segment (can be adjusted)
    // Each phase represents 1/9 (11.11%) of the total progress
    const completedPhases = phaseId - 1;
    const activePhaseProgress = 0.5; // 50% progress in current phase
    
    // Calculate total progress: completed phases + partial progress in active phase
    const totalProgress = ((completedPhases + activePhaseProgress) / phases.length) * 100;
    return Math.min(totalProgress, 100); // Ensure we don't exceed 100%
  };

  // Initialize component with current stage and start inactivity timer
  useEffect(() => {
    // Initialize with current presale stage from contract
    resetToCurrentStage();
    
    // Start the inactivity timer
    startResetTimer();
    
    // Add event listeners for user activity
    const resetTimer = () => startResetTimer();
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
      
      // Clear the timeout
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);
  
  // Update when contract data changes
  useEffect(() => {
    if (currentStage) {
      const stageNum = parseInt(currentStage);
      setActivePhase(stageNum);
      setSelectedPhase(stageNum);
      setCurrentMobilePhase(stageNum);
    }
    
    if (tokenPercent !== undefined) {
      setProgressPercent(tokenPercent);
    }
  }, [currentStage, tokenPercent]);
  
  // Update progress when active phase changes
  useEffect(() => {
    // Start with 0% and animate to the target percentage
    setProgressPercent(0);
    
    const timer = setTimeout(() => {
      setProgressPercent(calculateProgress(activePhase));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activePhase]);
  
  // Function to reset to current presale stage
  const resetToCurrentStage = () => {
    const stageNum = parseInt(currentStage) || 1;
    setActivePhase(stageNum);
    setSelectedPhase(stageNum);
    setProgressPercent(tokenPercent || calculateProgress(stageNum));
  };
  
  // Start or restart the inactivity timer
  const startResetTimer = () => {
    // Clear any existing timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    
    // Set a new timeout
    resetTimeoutRef.current = setTimeout(() => {
      resetToCurrentStage();
    }, INACTIVITY_TIMEOUT);
  };
  
  // Add click outside handler to close phase info
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If we have a selected phase and click is outside the phase info
      if (selectedPhase && !event.target.closest('.phase-item')) {
        setSelectedPhase(null);
        // Start the reset timer when user interacts
        startResetTimer();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      // Clear timeout when component unmounts
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [selectedPhase]);

  return (
    <PresalePhasesWrapper id="presale-phases" bgImage={stagesBackground}>
      <Container>
        <Row>
          <Col className="text-center">
            <div className="section-title">
              <h2 className="presale-title">Presale Roadmap</h2>
              <p className="presale-subtitle">Track our presale progress through each phase with increasing token value</p>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <div className="presale-phases-container">
              {/* Hat image positioned above the progress bar */}
              <div className="progress-container">
                <div 
                  className={`hat-image ${activePhase === 9 ? 'stage-nine' : ''}`}
                  style={{ 
                    left: `${activePhase === 9 ? 100 : progressPercent}%`,
                    transform: `translateX(-50%) ${activePhase === 9 ? 'rotate(15deg)' : ''}` 
                  }}
                >
                  <img src={hatImage} alt="MAGA Cap" />
                </div>
                
                {/* Progress bar */}
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Interactive Graph for Bonus and Price */}
              <div className="presale-graph-container">
                <div className="graph-title">
                  <span>Bonus & Price Trends</span>
                </div>
                <div className="graph-content">
                  <div className="graph-y-axis">
                    <div className="y-axis-label">Bonus %</div>
                    <div className="y-axis-values">
                      <span>10%</span>
                      <span>5%</span>
                      <span>0%</span>
                    </div>
                  </div>
                  <div className="graph-chart">
                    <div className="graph-bars">
                      {phases.map((phase) => (
                        <div 
                          key={`bonus-bar-${phase.id}`} 
                          className="graph-bar bonus-bar"
                          style={{ 
                            height: `${parseInt(phase.bonus) * 10}%`,
                            backgroundColor: phase.id <= activePhase ? '#F3BA2F' : 'rgba(243, 186, 47, 0.3)'
                          }}
                          data-phase={phase.id}
                          data-bonus={phase.bonus}
                          data-price={phase.price}
                        >
                          <div className="graph-tooltip">
                            <div>Stage {phase.id}</div>
                            <div>Bonus: {phase.bonus}</div>
                            <div>Price: {phase.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="graph-line">
                      {phases.map((phase, index) => {
                        // Convert price string to number (remove $ and convert to float)
                        const priceValue = parseFloat(phase.price.replace('$', ''));
                        // Calculate height percentage (normalize to the highest price which is $0.005)
                        const heightPercentage = (priceValue / 0.005) * 100;
                        
                        // Only draw line segment if not the first point
                        return index > 0 ? (
                          <div 
                            key={`price-line-${phase.id}`}
                            className="price-line-segment"
                            style={{
                              left: `${((index - 0.5) / (phases.length - 1)) * 100}%`,
                              height: `${heightPercentage}%`,
                              backgroundColor: phase.id <= activePhase ? '#d22626' : 'rgba(210, 38, 38, 0.3)'
                            }}
                          ></div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="graph-y-axis price-axis">
                    <div className="y-axis-label">Price $</div>
                    <div className="y-axis-values">
                      <span>$0.005</span>
                      <span>$0.003</span>
                      <span>$0.0004</span>
                    </div>
                  </div>
                </div>
                <div className="graph-x-axis">
                  {phases.map((phase) => (
                    <div key={`x-label-${phase.id}`} className="x-axis-label">
                      {phase.id}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desktop view - phase boxes with info popups */}
              {!isMobile && (
                <div className="phases-wrapper desktop-phases">
                  {phases.map((phase) => (
                    <div 
                      key={phase.id}
                      className={`phase-item ${phase.id === activePhase ? 'active' : ''} ${phase.id < activePhase ? 'completed' : ''} ${phase.id === selectedPhase ? 'info-visible' : ''}`}
                      onClick={(e) => {
                        // Update active phase
                        setActivePhase(phase.id);
                        
                        // Reset progress to 0 and then animate to new value
                        setProgressPercent(0);
                        setTimeout(() => {
                          setProgressPercent(calculateProgress(phase.id));
                        }, 50);
                        
                        // Toggle selected phase for info display
                        // Close any open phase info first
                        if (selectedPhase !== null && selectedPhase !== phase.id) {
                          setSelectedPhase(null);
                          // Small delay before opening the new one to prevent visual glitches
                          setTimeout(() => {
                            setSelectedPhase(phase.id);
                          }, 50);
                        } else {
                          // Toggle the current phase
                          setSelectedPhase(selectedPhase === phase.id ? null : phase.id);
                        }
                        
                        // Start/restart the inactivity timer
                        startResetTimer();
                        
                        // Prevent event bubbling
                        e.stopPropagation();
                      }}
                    >
                      <div className="phase-box">
                        <span className="phase-number">{phase.id}</span>
                      </div>
                      
                      <div className="phase-info">
                        <span 
                          className="close-btn" 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering parent click
                            setSelectedPhase(null);
                            // Start the reset timer when closing info
                            startResetTimer();
                          }}
                        >×</span>
                        <h4>{phase.title}</h4>
                        <div className="info-row">
                          <span>Price:</span>
                          <span>{phase.price}</span>
                        </div>
                        <div className="info-row">
                          <span>Volume:</span>
                          <span>{phase.volume}</span>
                        </div>
                        <div className="info-row">
                          <span>Bonus:</span>
                          <span>{phase.bonus}</span>
                        </div>
                        <div className="info-row">
                          <span>Status:</span>
                          <span style={{
                            color: phase.status === "Completed" ? "#d22626" : 
                                  phase.status === "Active" ? "rgb(29, 255, 150)" : 
                                  phase.status === "Upcoming" ? "#3b81a5" : "#FFFFFF"
                          }}>
                            {phase.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Mobile view - phase info slider */}
              {isMobile && (
                <div className="mobile-phases-wrapper">
                  <div className="mobile-phases-slider">
                    <div className="slider-controls">
                      <button 
                        className="slider-arrow prev"
                        onClick={() => {
                          const prevPhase = currentMobilePhase > 1 ? currentMobilePhase - 1 : phases.length;
                          setCurrentMobilePhase(prevPhase);
                          setActivePhase(prevPhase);
                          setProgressPercent(calculateProgress(prevPhase));
                          startResetTimer();
                        }}
                      >
                        &#10094;
                      </button>
                      
                      <div className="phase-info-card">
                        {phases.map((phase) => (
                          <div 
                            key={phase.id}
                            className={`mobile-phase-info ${phase.id === currentMobilePhase ? 'active' : ''}`}
                          >
                            <h4>{phase.title}</h4>
                            <div className="info-row">
                              <span>Price:</span>
                              <span>{phase.price}</span>
                            </div>
                            <div className="info-row">
                              <span>Volume:</span>
                              <span>{phase.volume}</span>
                            </div>
                            <div className="info-row">
                              <span>Bonus:</span>
                              <span>{phase.bonus}</span>
                            </div>
                            <div className="info-row">
                              <span>Status:</span>
                              <span style={{
                                color: phase.status === "Completed" ? "#d22626" : 
                                      phase.status === "Active" ? "rgb(29, 255, 150)" : 
                                      phase.status === "Upcoming" ? "#3b81a5" : "#FFFFFF"
                              }}>
                                {phase.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        className="slider-arrow next"
                        onClick={() => {
                          const nextPhase = currentMobilePhase < phases.length ? currentMobilePhase + 1 : 1;
                          setCurrentMobilePhase(nextPhase);
                          setActivePhase(nextPhase);
                          setProgressPercent(calculateProgress(nextPhase));
                          startResetTimer();
                        }}
                      >
                        &#10095;
                      </button>
                    </div>
                    
                    <div className="slider-dots">
                      {phases.map((phase) => (
                        <span 
                          key={phase.id}
                          className={`dot ${phase.id === currentMobilePhase ? 'active' : ''}`}
                          onClick={() => {
                            setCurrentMobilePhase(phase.id);
                            setActivePhase(phase.id);
                            setProgressPercent(calculateProgress(phase.id));
                            startResetTimer();
                          }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </PresalePhasesWrapper>
  );
};

export default PresalePhases;