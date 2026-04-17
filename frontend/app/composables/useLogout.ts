import { useTokenStore } from "~/stores/token";

const composible = async () => {
  const router = useRouter();
  const tokenStore = useTokenStore();

  tokenStore.$reset();
  await router.push("/");
};
export default composible;
