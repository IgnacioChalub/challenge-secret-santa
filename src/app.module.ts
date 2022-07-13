import { Module } from "@nestjs/common";
import { GroupModule } from "@SecretSanta/secretSanta.module";

@Module({
  imports: [GroupModule],
})
export class AppModule {}
