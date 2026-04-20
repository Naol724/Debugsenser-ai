import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  X, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Rocket,
  Crown,
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for individual developers',
      price: billingCycle === 'monthly' ? 0 : 0,
      yearlyPrice: 0,
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-600',
      features: [
        { name: '10 error analyses per month', included: true },
        { name: 'Basic error explanations', included: true },
        { name: '13+ programming languages', included: true },
        { name: 'Community support', included: true },
        { name: 'Code examples', included: true },
        { name: 'Priority support', included: false },
        { name: 'Unlimited analyses', included: false },
        { name: 'Advanced debugging tools', included: false },
        { name: 'Team collaboration', included: false },
        { name: 'API access', included: false },
        { name: 'Custom integrations', included: false }
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      description: 'For serious developers',
      price: billingCycle === 'monthly' ? 19 : 15,
      yearlyPrice: 180,
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-purple-600',
      features: [
        { name: 'Unlimited error analyses', included: true },
        { name: 'Advanced error explanations', included: true },
        { name: '13+ programming languages', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Code examples & fixes', included: true },
        { name: 'Error history & analytics', included: true },
        { name: 'Export explanations', included: true },
        { name: 'Custom themes', included: true },
        { name: 'Team collaboration', included: false },
        { name: 'API access', included: false },
        { name: 'Custom integrations', included: false }
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Team',
      description: 'For development teams',
      price: billingCycle === 'monthly' ? 49 : 39,
      yearlyPrice: 468,
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Up to 10 team members', included: true },
        { name: 'Shared error library', included: true },
        { name: 'Team analytics dashboard', included: true },
        { name: 'SSO authentication', included: true },
        { name: 'Priority support (24/7)', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Advanced team features', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Dedicated account manager', included: false }
      ],
      cta: 'Contact Sales',
      popular: false
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      yearlyPrice: null,
      icon: <Crown className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
      features: [
        { name: 'Everything in Team', included: true },
        { name: 'Unlimited team members', included: true },
        { name: 'Advanced security features', included: true },
        { name: 'On-premise deployment', included: true },
        { name: 'Custom AI models', included: true },
        { name: 'White-label solution', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Custom SLA guarantees', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Dedicated support team', included: true }
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      content: 'The Pro plan is worth every penny. Cut my debugging time by 80%!',
      plan: 'Pro',
      rating: 5
    },
    {
      name: 'Mike Johnson',
      role: 'Team Lead at TechCorp',
      content: 'Team plan transformed how our entire team handles debugging. Game changer!',
      plan: 'Team',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Freelance Developer',
      content: 'Started with Free, upgraded to Pro within a week. The difference is amazing.',
      plan: 'Pro',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required for the Free plan.'
    },
    {
      question: 'Do you offer discounts for students?',
      answer: 'Yes! We offer a 50% discount for students with valid .edu email addresses.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Choose the perfect plan for your needs. Start free and scale as you grow.
              No hidden fees, no surprises.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-8 bg-gray-200 rounded-full transition-colors"
              >
                <motion.div
                  animate={{ x: billingCycle === 'monthly' ? 0 : 32 }}
                  className="absolute top-1 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg"
                />
              </motion.button>
              <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
                <span className="ml-2 text-sm text-green-600 font-normal">(Save 20%)</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`bg-white rounded-2xl shadow-lg p-8 h-full border-2 ${
                  plan.popular ? 'border-blue-500' : 'border-transparent'
                } hover:shadow-xl transition-all`}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      {plan.price === 'Custom' ? (
                        <div className="text-3xl font-bold text-gray-900">Custom</div>
                      ) : (
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-gray-900">
                            ${billingCycle === 'monthly' ? plan.price : plan.yearlyPrice / 12}
                          </span>
                          <span className="text-gray-500">
                            /{billingCycle === 'monthly' ? 'month' : 'month (billed yearly)'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by Developers</h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about DebugSense AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {testimonial.plan}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers debugging faster with DebugSense AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Start Free Trial
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
