  <div class="prtm-content">
                    <div class="prtm-page-bar">
                       <div class="caption">
                 <h3 class="text-capitalize">All contacts of Group -<?php echo $group_name;?> </h3> 
                                </div>
                    </div>

 <section class="content">
 <?php echo $this->session->flashdata('msg');?>
  <div class="row">
    <div class="col-md-9 col-md-offset-1">
        <div class="box box-success">
            <div class="box-header">
              <h3 class="box-title"></h3>
            </div>
                <div class="box-body">
                <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Name</th>                                  
                  <th>email</th>
                   <th>mobile</th>
                   <th>Additional info</th>
                   <th>Actions</th>              
                </tr>
                </thead>
                <tbody>
                 <?php  $i=1; foreach($contacts as $row):?>
                <tr>
                  <td><?php echo $i++;?></td>
                  <td><?php echo $row->name;?></td>              
             <td><?php echo $row->email;?></td>
             <td><?php echo $row->phone;?></td>
             <td><?php echo $row->additional_info;?></td>
                   <td>        
            <a href="<?php echo site_url('Groups/delete_from_group/');echo $row->cg_id;echo"/";echo $row->grp_id;?>" onclick="return confirm(' you want to delete?');">Remove</a>
          </td>
                 
                
                </tr>
                <?php endforeach;?>
                 </tbody>
              </table>
                </div>
                
        </div>
    </div>
  </div>
 </section>
</div>