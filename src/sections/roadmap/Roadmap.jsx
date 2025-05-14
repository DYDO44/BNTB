import RoadmapWrapper from "./Roadmap.style";

const Roadmap = () => {
  return (
    <RoadmapWrapper id="roadmap">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="roadmap-title">ROADMAP</h2>
            <p className="roadmap-subtitle">
              Our journey follows the golden path to success
            </p>

            <div className="roadmap-timeline">
              <div className="roadmap-container left">
                <div className="roadmap-content">
                  <div className="roadmap-date">Q1 2025</div>
                  <div className="roadmap-phase">Phase 1: Foundation</div>
                  <ul>
                    <li>Project conceptualization and team formation</li>
                    <li>Whitepaper and technical documentation finalization</li>
                    <li>Smart contract development and security audit</li>
                    <li>Website and brand identity launch</li>
                    <li>Community building across social media platforms</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-container right">
                <div className="roadmap-content">
                  <div className="roadmap-date">Q2 2025</div>
                  <div className="roadmap-phase">Phase 2: Token Launch</div>
                  <ul>
                    <li>Private sale for early investors</li>
                    <li>Public token presale event</li>
                    <li>Initial DEX listing on major exchanges</li>
                    <li>Launch of staking platform and rewards system</li>
                    <li>Implementation of initial governance mechanisms</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-container left">
                <div className="roadmap-content">
                  <div className="roadmap-date">Q3 2025</div>
                  <div className="roadmap-phase">Phase 3: Platform Growth</div>
                  <ul>
                    <li>Beta release of core platform features</li>
                    <li>Integration with major DeFi protocols</li>
                    <li>Expansion to multiple blockchain networks</li>
                    <li>Strategic partnerships with established projects</li>
                    <li>Enhanced security features and protocol upgrades</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-container right">
                <div className="roadmap-content">
                  <div className="roadmap-date">Q4 2025</div>
                  <div className="roadmap-phase">Phase 4: Ecosystem Expansion</div>
                  <ul>
                    <li>Full platform launch with complete feature set</li>
                    <li>Mobile application release for iOS and Android</li>
                    <li>Developer SDK and API integration tools</li>
                    <li>Accelerator program for ecosystem projects</li>
                    <li>Global marketing campaign and exchange listings</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-container left">
                <div className="roadmap-content">
                  <div className="roadmap-date">Q1 2026</div>
                  <div className="roadmap-phase">Phase 5: Market Expansion</div>
                  <ul>
                    <li>Enterprise solutions and business integrations</li>
                    <li>Cross-chain interoperability enhancements</li>
                    <li>Advanced governance framework implementation</li>
                    <li>Institutional partnerships and service offerings</li>
                    <li>Decentralized autonomous organization (DAO) transition</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoadmapWrapper>
  );
};

export default Roadmap;
