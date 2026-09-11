import { PageSheet } from "@/components/PageSheet";
import { ChallengePanel } from "@/components/ChallengeEntry";
import { getChallenge } from "@/lib/books";

export const dynamic = "force-dynamic";

export default async function YearPage() {
  const challenge = await getChallenge();

  return (
    <PageSheet>
      <ChallengePanel challenge={challenge} />
    </PageSheet>
  );
}
