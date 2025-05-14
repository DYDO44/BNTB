import { useState } from "react";
import FaqWrapper from "./Faq.style";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the token utility?",
      answer:
        "Our token serves multiple utilities within our ecosystem. It facilitates transactions with reduced fees, provides governance rights for platform decisions, enables staking for passive income, and grants access to premium features and services on our platform."
    },
    {
      question: "How can I participate in the token sale?",
      answer:
        "To participate in our token sale, you need to connect your wallet using the 'Connect Wallet' button at the top of the page. Once connected, you can select the amount of tokens you wish to purchase and the currency you want to use for payment. Follow the prompts to complete your transaction."
    },
    {
      question: "When will the tokens be distributed?",
      answer:
        "Tokens will be distributed immediately after your purchase is confirmed on the blockchain. You can view your token balance by connecting your wallet to our platform. If you participated in a pre-sale event, tokens will be distributed according to the schedule outlined in our whitepaper."
    },
    {
      question: "Is there a vesting period for the tokens?",
      answer:
        "Yes, there are vesting periods for certain token allocations. Team and advisor tokens have a 24-month vesting schedule with a 6-month cliff. Tokens allocated for strategic partnerships have a 12-month vesting period. Public sale tokens are not subject to vesting and will be fully available upon distribution."
    },
    {
      question: "Which blockchain networks do you support?",
      answer:
        "Our platform currently supports Ethereum and Binance Smart Chain networks, with plans to expand to additional networks in the future. You can switch between supported networks directly from the platform interface to choose your preferred network for transactions."
    },
    {
      question: "Are the smart contracts audited?",
      answer:
        "Yes, all our smart contracts have undergone rigorous security audits by reputable audit firms. The audit reports are publicly available on our website under the 'Security' section. We're committed to maintaining the highest security standards to protect our users."
    }
  ];

  return (
    <FaqWrapper id="faq">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="faq-title">FAQ</h2>
            <p className="faq-subtitle">
              Frequently asked questions about our platform and token
            </p>

            <div className="faq-container">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeIndex === index ? "active" : ""}`}
                >
                  <div
                    className="faq-header"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3>{item.question}</h3>
                  </div>
                  <div className={`faq-body ${activeIndex === index ? "active" : ""}`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FaqWrapper>
  );
};

export default Faq;
