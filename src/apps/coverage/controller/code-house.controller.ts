import { Crud, CrudController } from '@nestjsx/crud'
import { CodeHouse } from '../entities/code-house.entity'
import { CodeHouseCrudService } from '../service/crud/code-house.crud.service'
import { Controller } from '@nestjs/common'

@Crud({
  model: {
    type: CodeHouse,
  },
})
@Controller('code-house')
export class CodeHouseController implements CrudController<CodeHouse> {
  constructor(public service: CodeHouseCrudService) {}
}
