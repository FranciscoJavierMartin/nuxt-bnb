import { unWrap, getErrorResponse } from '~/utils/fetchUtils';

export default function ({ $config }, inject) {
  let stripe;
  addScript();

  inject('stripe', {
    checkout,
  });

  function addScript() {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = initStripe;
    document.head.appendChild(script);
  }

  function initStripe() {
    stripe = window.Stripe($config.stripe.key);
  }

  async function createSession(homeId, start, end) {
    try {
      return unWrap(
        await fetch('/api/stripe/create-session', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            homeId,
            start,
            end,
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function checkout(homeId, start, end) {
    const id = (await createSession(homeId, start, end)).json.id;
    await stripe.redirectToCheckout({ sessionId: id });
  }
}
