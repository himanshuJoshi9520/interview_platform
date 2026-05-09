import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Starter",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners to try out the AI interview experience.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
      color: "from-gray-400 to-gray-600",
      buttonColor: "bg-gray-700 hover:bg-gray-600",
    },
    {
      id: "basic",
      name: "Pro",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and targeted skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed AI Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
      color: "from-emerald-400 to-teal-500",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500",
    },
    {
      id: "pro",
      name: "Elite",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation and continuous practice.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
      color: "from-purple-500 to-indigo-600",
      buttonColor: "bg-purple-600 hover:bg-purple-500",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =  
      plan.id === "basic" ? 100 :
      plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order" , {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      },{withCredentials:true})
      
      const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: result.data.amount,
      currency: "INR",
      name: "JobPrep.AI",
      description: `${plan.name} - ${plan.credits} Credits`,
      order_id: result.data.id,

      handler:async function (response) {
        const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
        dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")

      },
      theme:{
        color: "#10b981",
      },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null);
    } catch (error) {
     console.log(error)
     setLoadingPlan(null);
    }
  }

  return (
    <div className='min-h-screen bg-[#0a0a0a] text-white py-20 px-6 relative overflow-hidden'>
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className='max-w-7xl mx-auto'>
        
        {/* Header Section */}
        <div className='relative mb-20 text-center max-w-3xl mx-auto'>
          <button 
            onClick={() => navigate("/")} 
            className='absolute left-0 top-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md text-gray-300 hover:text-white'
          >
            <FaArrowLeft />
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Unlock Your Potential
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              Choose the perfect plan to accelerate your career and master every interview.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto relative z-10'>
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const isElite = plan.id === "pro";

            return (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`relative rounded-[2.5rem] p-[2px] cursor-pointer transition-all duration-300 ${isElite ? 'md:-mt-8 md:mb-8' : ''}`}
              >
                {/* Animated Gradient Border */}
                <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${plan.color} ${isSelected ? 'opacity-100' : 'opacity-30'} blur-[2px] transition-opacity duration-300`}></div>
                
                {/* Outer Glow when selected */}
                {isSelected && (
                   <div className={`absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br ${plan.color} opacity-40 blur-xl transition-opacity duration-300`}></div>
                )}

                {/* Card Content */}
                <div className={`relative h-full rounded-[2.5rem] bg-gray-900/90 backdrop-blur-xl p-8 flex flex-col ${isSelected ? 'border border-white/10' : 'border border-white/5'}`}>
                  
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
                      <FaStar className="text-yellow-300" /> {plan.badge}
                    </div>
                  )}

                  {plan.default && (
                    <div className="absolute top-6 right-6 bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full border border-white/10">
                      Current Plan
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="my-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-white">
                        {plan.price}
                      </span>
                    </div>
                    <div className={`mt-2 inline-block px-3 py-1 rounded-lg bg-gradient-to-r ${plan.color} bg-opacity-20 text-white text-sm font-semibold shadow-inner`}>
                      {plan.credits} Credits
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 h-12">
                    {plan.description}
                  </p>

                  <div className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br ${plan.color}`}>
                          <FaCheckCircle className="text-white text-xs" />
                        </div>
                        <span className="text-gray-300 text-sm font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {!plan.default && (
                    <button
                      disabled={loadingPlan === plan.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isSelected) {
                          setSelectedPlan(plan.id)
                        } else {
                          handlePayment(plan)
                        }
                      }} 
                      className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg ${
                        isSelected
                          ? `${plan.buttonColor} text-white`
                          : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {loadingPlan === plan.id
                        ? "Processing Securely..."
                        : isSelected
                          ? "Proceed to Checkout"
                          : "Select This Plan"}
                    </button>
                  )}

                  {plan.default && (
                    <button disabled className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 bg-white/5 text-gray-500 cursor-not-allowed mt-auto border border-white/5">
                      Currently Active
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Pricing
