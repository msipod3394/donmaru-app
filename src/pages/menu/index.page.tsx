import { VStack } from "@chakra-ui/react";
import { useFullPropertyDons } from "@/provider/FullPropertyDonsContext";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { MenuCard } from "./MenuCard";

export default function PageMenu() {

  // 全てのプロパティが揃ったデータ
  const { fullPropertyDons } = useFullPropertyDons();

  return (
    <DefaultLayout pageTitle="全メニュー">
      <VStack minW="100%" spacing={2} mt="2rem" mb="2rem" minH="500px">
        {fullPropertyDons && <MenuCard dons={fullPropertyDons} />}
      </VStack>
    </DefaultLayout>
  );
}
