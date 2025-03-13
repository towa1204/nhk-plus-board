import PageCard from "../components/PageCard.tsx";

export default function Home() {
  const settings = [
    {
      name: "Program List",
      description: `視聴番組の放送情報を表示`,
      link: `/programs/list`,
    },
    {
      name: "Program Setting",
      description: `視聴番組の設定`,
      link: `/programs/setting`,
    },
    {
      name: "NHK API",
      description: `放送エリアとAPIキーを設定`,
      link: `/nhkapi`,
    },
    {
      name: "Notification",
      description: `通知先の情報を設定`,
      link: `/notification`,
    },
  ];

  return (
    <>
      <div className="space-y-4">
        {settings.map(({ name, description, link }) => (
          <PageCard name={name} description={description} link={link} />
        ))}
      </div>
    </>
  );
}
