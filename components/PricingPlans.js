const PricingPlans = () => {
  return (
    <div className="pricing-plans">
      <div className="pricing-plan">
        <div className="pricing-plan-head">Free</div>
        <div className="pricing-plan-subheader">For small teams</div>
        <div className="pricing-plan-body">
          <div>
            <span className="bull">&bull;</span> Team members:{" "}
            <span>Up to 6</span>
          </div>
          <div>
            <span className="bull">&bull;</span> Storage: <span>1GB</span>
          </div>
          <div>
            <span className="bull">&bull;</span> Email support
          </div>
        </div>
        <div className="price">
          <div className="price-first-row">0$/mo</div>
          <div className="price-second-row">free</div>
        </div>
        <button
          className="button-wrapper"
          style={{ width: "100%", marginTop: 40, opacity: 0.9 }}
        >
          <span className="button button-primary pricing-button" tabindex="-1">
            Create a Team
          </span>
        </button>
      </div>
      <div className="pricing-plan" style={{ transform: "scale(1.05)" }}>
        <div className="pricing-plan-head">Standard</div>
        <div className="pricing-plan-subheader">
          For small/medium-sized teams
        </div>
        <div className="pricing-plan-body">
          <div>
            <span className="bull">&bull;</span> Team members:{" "}
            <span>Unlimited</span>
          </div>
          <div>
            <span className="bull">&bull;</span> Storage: <span>Unlimited</span>
          </div>
          <div>
            <span className="bull">&bull;</span> Automatic emails
          </div>
          <div>
            <span className="bull">&bull;</span> Email support
          </div>
          <div>
            <span className="bull">&bull;</span> 1 Month Free Trial
          </div>
        </div>
        <div className="price">
          <div className="price-first-row">3$/mo</div>
          <div className="price-second-row">per active user</div>
        </div>
        <button
          className="button-wrapper"
          style={{ width: "100%", marginTop: 40 }}
        >
          <span className="button button-primary pricing-button" tabindex="-1">
            Create a Team
          </span>
        </button>
      </div>
      <div className="pricing-plan">
        <div className="pricing-plan-head">Self-hosted</div>
        <div className="pricing-plan-subheader">For larger teams</div>
        <div className="pricing-plan-body">
          <div>
            <span className="bull">&bull;</span> Team members:{" "}
            <span>Unlimited</span>
          </div>
          <div>
            <span className="bull">&bull;</span> Storage:{" "}
            <span>Firebase Storage</span>
          </div>
          <div>
            <span className="bull">&bull;</span> Email support
          </div>
        </div>
        <div className="price">
          <div className="price-first-row">–/mo</div>
          <div className="price-second-row">own expenses</div>
        </div>
        <button
          className="button-wrapper"
          style={{ width: "100%", marginTop: 40, opacity: 0.9 }}
        >
          <span className="button button-primary pricing-button" tabindex="-1">
            Clone on Github
          </span>
        </button>
      </div>
    </div>
  );
};

export default PricingPlans;
